import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contact = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};
  @ViewChild('wavesCanvas') wavesCanvasRef!: ElementRef<HTMLCanvasElement>;
  private width = 0;
  private height = 0;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private particles: Particle[] = [];
  private PARTICLE_COUNT = 210;
  private PARTICLE_RADIUS = 2.2;
  private LINE_DISTANCE = 90;
  private PARTICLE_COLOR = 'rgba(34, 197, 94, 0.85)';
  private LINE_COLOR = 'rgba(34, 197, 94, 0.18)';
  private lastCanvasWidth = 0;
  private lastCanvasHeight = 0;
  private destroyed = false;
  private animationStarted = false;
  private mouse = { x: -1000, y: -1000 };
  private MOUSE_REPEL_RADIUS = 80;
  private MOUSE_REPEL_STRENGTH = 0.12;

  constructor(private ngZone: NgZone,private mainService: MainService) {}
  
  submitContactForm() {
    const payload = {
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      email: this.contact.email,
      message: this.contact.message
    };

    this.mainService.sendContactMessage(payload).subscribe({
      next: () => {
        alert('✅ تم إرسال الرسالة بنجاح!');
        this.contact = {
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          
        };
      },
      error: (err) => {
        console.error('❌ خطأ أثناء الإرسال:', err);
        alert('❌ فشل في إرسال الرسالة');
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.destroyed = false;
    this.tryStartAnimation();
  }
  

  ngAfterViewChecked(): void {
    this.tryStartAnimation();
  }

  private tryStartAnimation() {
    if (this.animationStarted || this.destroyed) return;
    const canvas = this.wavesCanvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;
    this.resizeCanvas(canvas, true);
    window.addEventListener('resize', () => this.resizeCanvas(canvas, false));
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e, canvas));
    canvas.addEventListener('mouseleave', () => this.onMouseLeave());
    canvas.addEventListener('touchmove', (e) => this.onTouchMove(e, canvas));
    canvas.addEventListener('touchend', () => this.onMouseLeave());
    this.animationStarted = true;
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private resizeCanvas(canvas: HTMLCanvasElement, forceInit = false) {
    const newWidth = canvas.offsetWidth;
    const newHeight = canvas.offsetHeight;
    const oldWidth = this.width || newWidth;
    const oldHeight = this.height || newHeight;
    if (
      forceInit ||
      newWidth !== this.lastCanvasWidth ||
      newHeight !== this.lastCanvasHeight
    ) {
      this.width = canvas.width = newWidth;
      this.height = canvas.height = newHeight;
      this.lastCanvasWidth = newWidth;
      this.lastCanvasHeight = newHeight;
      if (this.particles.length === 0 || forceInit) {
        this.initParticles();
      } else {
        for (let p of this.particles) {
          p.x = (p.x / oldWidth) * newWidth;
          p.y = (p.y / oldHeight) * newHeight;
        }
      }
    }
  }

  private onMouseMove(e: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  private onTouchMove(e: TouchEvent, canvas: HTMLCanvasElement) {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    }
  }

  private onMouseLeave() {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }
  }

  private animate = () => {
    if (this.destroyed) return;
    const canvas = this.wavesCanvasRef?.nativeElement;
    if (!canvas) {
      this.animationStarted = false;
      return;
    }
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      this.animationStarted = false;
      return;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    // Draw lines between close particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < this.LINE_DISTANCE) {
          this.ctx.save();
          this.ctx.strokeStyle = this.LINE_COLOR;
          this.ctx.lineWidth = 1.1;
          this.ctx.globalAlpha = 0.18 + 0.22 * (1 - dist / this.LINE_DISTANCE);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.globalAlpha = 1;
          this.ctx.restore();
        }
      }
    }
    // Draw lines from mouse to close particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dist = Math.hypot(p.x - this.mouse.x, p.y - this.mouse.y);
      if (dist < this.LINE_DISTANCE * 1.1) {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.32)';
        this.ctx.lineWidth = 1.2;
        this.ctx.globalAlpha =
          0.22 + 0.25 * (1 - dist / (this.LINE_DISTANCE * 1.1));
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
        this.ctx.restore();
      }
    }
    // Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.PARTICLE_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = this.PARTICLE_COLOR;
      this.ctx.shadowColor = '#22c55e';
      this.ctx.shadowBlur = 2;
      this.ctx.fill();
      this.ctx.restore();
    }
    // Move particles and apply mouse repulsion
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      // Repulsion from mouse
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.MOUSE_REPEL_RADIUS && dist > 0.1) {
        const force =
          ((this.MOUSE_REPEL_RADIUS - dist) / this.MOUSE_REPEL_RADIUS) *
          this.MOUSE_REPEL_STRENGTH;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
      p.x += p.vx;
      p.y += p.vy;
      // Bounce off edges
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
      p.x = Math.max(0, Math.min(this.width, p.x));
      p.y = Math.max(0, Math.min(this.height, p.y));
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    this.destroyed = true;
    this.animationStarted = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
