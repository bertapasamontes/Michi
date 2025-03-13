import { Component } from '@angular/core';
import { ProfileBigInfoComponent } from "../../atomos/profile-big-info/profile-big-info.component";
import { User } from '../../../interfaces/users';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { ProductoFavComponent } from "../../moleculas/producto-fav/producto-fav.component";

@Component({
  selector: 'app-mobile-perfil',
  imports: [ProfileBigInfoComponent, ProductoFavComponent],
  templateUrl: './mobile-perfil.component.html',
  styleUrl: './mobile-perfil.component.scss'
})
export class MobilePerfilComponent {
constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ){}

  usuarioLogueado:any;
  // usuarioLogueado!:User;


  ngOnInit(){
    const user = this._authService.getUserFromToken();
    console.log(user);

    this._userService.getUserByEmail(user.email).subscribe((user)=>{
      try{
      this.usuarioLogueado = user;
      console.log(this.usuarioLogueado);

      console.log("user como userLogueado welcome")
      }
      catch(error){
        console.log('error al asignar el user como el userloguedo')
      }
    });   
  }

  onGuardarProductoFav(idProducto: string) {
    console.log('Producto recibido:', idProducto);
    console.log('id user:', this.usuarioLogueado._id);
    console.log('favs:', this.usuarioLogueado.misFavs);

    // Comprobar si el producto ya está en favoritos
    const productoYaGuardado = this.usuarioLogueado.misFavs?.some((fav: { _id: string; }) => fav._id === idProducto);

    if (productoYaGuardado) {
      console.log('producto ya guardado, eliminando.');
      this._userService.deleteFavProduct(this.usuarioLogueado._id, idProducto).subscribe(response => {
        console.log('Producto eliminado de favoritos:', response);
      });
    } else {
      console.log('no está. agregando');
      this._userService.addFavProduct(this.usuarioLogueado._id, idProducto).subscribe(response => {
        console.log('producto agregado a misfavs:', response);
      });
    }
  }
}
