import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnInit, Input, OnChanges,Inject,Renderer2  } from '@angular/core';


@Directive({
  selector: '[kidsFashionFormError]'
})
export class FormErrorDirective implements OnChanges, OnInit {

  constructor(private el: ElementRef,@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) { }
  ngOnInit(): void {
    const errorDiv = this.document.createElement('div');
    errorDiv.classList.add("invalid-feedback");
    this.renderer.appendChild(this.el.nativeElement, errorDiv);
  }

  @Input() mtpFormError: any;


  ngOnChanges(changes: any) {
    if(typeof this.mtpFormError == "string") this.agregarFormatoError();
    else this.quitarFormatoError();
  }

  private agregarFormatoError() {
    this.el.nativeElement.classList.add("is-invalid-marign");
    let input = this.el.nativeElement.children[0] as HTMLElement;
    input.classList.add("is-invalid");
    console.log(this.el.nativeElement);
    const thirdChild = this.el.nativeElement.children[2];
    if (thirdChild instanceof HTMLElement) {
      thirdChild.innerText = this.mtpFormError || ''; // Asigna this.mtpFormError si existe, o una cadena vacía si es undefined o null
    }
  }
  
  private quitarFormatoError() {
    this.el.nativeElement.classList.remove("is-invalid-marign");
    let input = this.el.nativeElement.children[0] as HTMLElement;
    input.classList.remove("is-invalid");
    
    const thirdChild = this.el.nativeElement.children[2];
    if (thirdChild instanceof HTMLElement) {
      thirdChild.innerText = '';
    }
  }
  

}
