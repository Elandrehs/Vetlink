
import {Component, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {AddProductButtonComponent} from '../../../../shared/components/buttons/add-product-button/add-product-button.component';
import {FormsModule, NgForm} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseFormComponent} from '../../../../shared/components/bases/base-form.component';
import {Product} from '../../models/product.entity';

@Component({
  selector: 'app-product-form-modal',
  imports: [
    AddProductButtonComponent,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.css'
})
export class ProductFormModalComponent extends BaseFormComponent{
  @Output() closeModal = new EventEmitter<void>();

  @Input() product!: Product; /*producto creado o editado*/
  @Input() editMode: boolean = false;
  @Output() protected productAddRequested=new EventEmitter<Product>();/*dice que un producto debe ser agregado*/
  @Output() protected productUpdatedRequested=new EventEmitter<Product>();
  @Output() protected productDeleteRequested=new EventEmitter<Product>();
  @Output() protected cancelRequested=new EventEmitter<void>();

  /*VEREMOS SI LO USARE*/
  @ViewChild('productForm', { static: false }) protected productForm!: NgForm;


  /*inicializa el componente sin ningun producto agregado*/
  constructor() {
    super();
    this.product=new Product({});
  }

  private resetEditState(){
    this.product=new Product({});
    this.editMode=false;
    this.productForm.reset();
  }

  private isValid=()=>this.productForm.valid;

  private isEditMode=():boolean=>this.editMode;

  public onSubmit() {
    if(this.isValid()) {
      let emitter = this.isEditMode() ? this.productUpdatedRequested : this.productAddRequested;
      emitter.emit(this.product);
      this.resetEditState();
      this.closeModal.emit();  // Solo cerrar si es válido
    } else {
      console.error('Invalid form data');
    }
  }
  protected onCancel(){
    this.cancelRequested.emit();
    this.resetEditState();
    this.closeModal.emit();
  }

}
