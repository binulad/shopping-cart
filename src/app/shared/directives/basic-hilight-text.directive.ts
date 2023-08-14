import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBasicHiLightText]'
})
export class BasicHiLightTextDirective implements OnInit {
  @Input() public defaultColor: string = 'transparent';
  @Input() public hiLightColor: string = 'pink';

  // Using HostBinding
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Using Basic Styling
    // this.el.nativeElement.style.backgroundColor = "yellow";

    // Using Renderer
    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink');

    // Initialize the BackGround Color
    this.backgroundColor = this.defaultColor;
  }

  // Using Host Listener
  @HostListener('mouseenter') mouseover() {
    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink');

    // Use the HostBinding instead of Renderer
    // this.backgroundColor = 'pink';
    this.backgroundColor = this.hiLightColor;
  }
  @HostListener('mouseleave') mouseleave() {
    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');

    // Use the HostBinding instead of Renderer
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
