import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

const RULES = [
  { test: (p) => /hero-section|night-villa/.test(p), maxWidth: 2400 },
  { test: (p) => /estate-section/.test(p), maxWidth: 1920 },
  { test: (p) => /experience-pillar\/(experience-3|private-beach)/.test(p), maxWidth: 1920 },
  { test: (p) => /experience-pillar/.test(p), maxWidth: 1600 },
  { test: (p) => /food-pillar/.test(p), maxWidth: 1600 },
];

const SKIP = (relPath) => /logo/.test(relPath);

function getMaxWidth(relPath) {
  for (const rule of RULES) {
    if (rule.test(relPath)) return rule.maxWidth;
  }
  return 1920;
}

function walk(dir) {
  return fs.readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function toWebpPath(filePath) {
  return filePath.replace(/\.(jpe?g|png)$/i, ".webp");
}

async function optimize(filePath) {
  const rel = path.relative(IMAGES_DIR, filePath).replace(/\\/g, "/");
  if (SKIP(rel)) return;

  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const before = fs.statSync(filePath).size;
  const meta = await sharp(filePath).metadata();
  const maxWidth = getMaxWidth(rel);
  const needsResize = (meta.width ?? 0) > maxWidth;
  const convertToWebp = [".jpg", ".jpeg", ".png"].includes(ext);
  const outPath = convertToWebp ? toWebpPath(filePath) : filePath;

  if (ext === ".webp" && before < 500_000) {
    console.log(`  skip  ${rel} (already optimized)`);
    return;
  }

  if (!needsResize && before < 400_000) {
    if (convertToWebp && fs.existsSync(outPath)) {
      console.log(`  skip  ${path.relative(IMAGES_DIR, outPath).replace(/\\/g, "/")} (already optimized)`);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return;
    }
    if (!convertToWebp) {
      console.log(`  skip  ${rel} (already optimized)`);
      return;
    }
  }

  let pipeline = sharp(filePath).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (convertToWebp) {
    pipeline = pipeline.webp({ quality: 88 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: 88 });
  } else {
    pipeline = pipeline.png({ quality: 90, compressionLevel: 9 });
  }

  const buffer = await pipeline.toBuffer();

  if (outPath === filePath) {
    fs.writeFileSync(outPath, buffer);
  } else {
    const tempPath = `${outPath}.tmp`;
    fs.writeFileSync(tempPath, buffer);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    fs.renameSync(tempPath, outPath);
  }

  const after = fs.statSync(outPath).size;
  const outRel = path.relative(IMAGES_DIR, outPath).replace(/\\/g, "/");
  const saved = before > 0 ? ((1 - after / before) * 100).toFixed(0) : "0";
  console.log(
    `  done  ${outRel}: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB (−${saved}%)`,
  );
}

async function main() {
  console.log("Optimizing images for production (WebP) …\n");
  const files = walk(IMAGES_DIR);
  for (const file of files) {
    try {
      await optimize(file);
    } catch (err) {
      console.error(`  fail  ${path.relative(IMAGES_DIR, file)}: ${err.message}`);
    }
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
