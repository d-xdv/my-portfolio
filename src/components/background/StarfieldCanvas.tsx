import { useEffect, useRef } from 'react';

interface Planet {
  x: number;
  y: number;
  radius: number;
  image: HTMLImageElement;
  centralX: number;
  centralY: number;
  orbitRadius: number;
  angle: number;
  speed: number;
  selfRotation: number;
  baseAlpha: number; // لتحديد شفافية الكوكب حسب عمقه
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spaceElementsRef = useRef<{
    stars: { x: number; y: number; radius: number; speed: number; alpha: number }[];
    planets: Planet[];
  }>({ stars: [], planets: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpace();
    };

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      });
    };

    const initSpace = async () => {
      const stars: { x: number; y: number; radius: number; speed: number; alpha: number }[] = [];
      const planets: Planet[] = [];

      // توليد النجوم
      const numStars = Math.floor((canvas.width * canvas.height) / 1000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.4 + 0.05,
          alpha: Math.random(),
        });
      }

      try {
        // تحميل الكواكب السبعة كلها دفعة واحدة
        const imagePromises = [];
        for (let i = 1; i <= 7; i++) {
          imagePromises.push(loadImage(`/planet-${i}.png`));
        }
        const loadedImages = await Promise.all(imagePromises);

        // إعدادات الكواكب الـ 7 (توزيع متناسق للأحجام، المواقع، والشفافية)
        // cx و cy هما نسب مئوية من عرض وطول الشاشة لتناسب كل الأجهزة
        const planetConfigs = [
          { radius: 45, cx: 0.15, cy: 0.2, orbit: 80, speed: 0.0008, alpha: 0.7 }, // كوكب 1: أعلى اليسار
          { radius: 70, cx: 0.85, cy: 0.75, orbit: 120, speed: 0.0005, alpha: 0.6 }, // كوكب 2: أسفل اليمين
          { radius: 180, cx: 0.2, cy: 0.6, orbit: 250, speed: 0.0003, alpha: 0.25 }, // كوكب 3: ضخم وخافت جداً (عمق)
          { radius: 35, cx: 0.8, cy: 0.25, orbit: 60, speed: 0.001, alpha: 0.8 },   // كوكب 4: صغير وسريع يمين
          { radius: 100, cx: 0.5, cy: 0.1, orbit: 180, speed: 0.0004, alpha: 0.4 },  // كوكب 5: متوسط في المنتصف العلوي
          { radius: 250, cx: 0.7, cy: 0.5, orbit: 350, speed: 0.00015, alpha: 0.15 },// كوكب 6: الأضخم والأكثر خفوتاً بالخلفية
          { radius: 55, cx: 0.3, cy: 0.85, orbit: 100, speed: 0.0007, alpha: 0.65 }, // كوكب 7: أسفل اليسار
        ];

        // دمج الصور مع الإعدادات لإنشاء الكواكب
        loadedImages.forEach((img, index) => {
          const config = planetConfigs[index];
          planets.push({
            x: 0, y: 0,
            radius: config.radius,
            image: img,
            centralX: canvas.width * config.cx,
            centralY: canvas.height * config.cy,
            orbitRadius: config.orbit,
            angle: Math.random() * Math.PI * 2, // زاوية بداية عشوائية
            speed: config.speed,
            selfRotation: Math.random() * Math.PI * 2,
            baseAlpha: config.alpha
          });
        });

      } catch (error) {
        console.error("فشل في تحميل صور الكواكب:", error);
      }

      spaceElementsRef.current = { stars, planets };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { stars, planets } = spaceElementsRef.current;

      // رسم النجوم
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 244, 255, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
      });

      // رسم الكواكب الـ 7
      planets.forEach((planet) => {
        planet.x = planet.centralX + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = planet.centralY + Math.sin(planet.angle) * planet.orbitRadius;

        planet.angle += planet.speed;
        planet.selfRotation += 0.001; // دوران بطيء جداً حول نفسه

        ctx.save();
        ctx.translate(planet.x, planet.y);
        ctx.rotate(planet.selfRotation);

        // تطبيق الشفافية المخصصة لكل كوكب حسب حجمه وموقعه
        ctx.globalAlpha = planet.baseAlpha;

        const diameter = planet.radius * 2;
        ctx.drawImage(
          planet.image,
          -planet.radius,
          -planet.radius,
          diameter,
          diameter
        );
        
        ctx.globalAlpha = 1.0;
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-90"
    />
  );
}