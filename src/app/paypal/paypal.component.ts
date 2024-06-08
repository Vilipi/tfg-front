import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { LoginFacade } from '../features/login/service/login.facade';
import { UserModel } from '../features/login/models/user-model';
import { ProfileService } from '../features/profile/services/profile.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showSuccess: boolean = false;
  public userData: UserModel;
  //business example
  // sb-c0xef31057865@business.example.com
  // n,+xvgP82

  // sb-pbclh31071733@personal.example.com
  // 7+?S@vKT1

  constructor(
    public dialogRef: MatDialogRef<PaypalComponent>, private loginFacade: LoginFacade, private profileService: ProfileService) {}

  async ngOnInit() {
    this.loginFacade.getLoginFacade().subscribe((data) => {
      this.userData = data;
    })
    this.initConfig();
    this.updateDialogSize();
  }


  updateDialogSize(): void {
    if (this.showSuccess) {
      this.dialogRef.updateSize('35rem', '15rem');
    } else {
      this.dialogRef.updateSize('35rem', '30rem'); // Tamaño inicial
      this.dialogRef.removePanelClass('success-dialog');
    }
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AWzP_wM00MoFpYMqA-eOrhwNqEKze9j9zdafaXFT3BOKe5ycYK9II_ySqY_gCcdSFf9InnSMcyJwC4QY',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Premium account',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.userData.userType = 'pro';

      this.profileService.updateApiProfile(this.userData).subscribe((result) => {
        if (result.message == "User modified") {
          this.showSuccess = true;
          this.loginFacade.setLoginFacade(this.userData);
          const userDataString = JSON.stringify(this.userData);
          localStorage.setItem('userData', userDataString);
        } else{
          console.log(result);
        }
      });


    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
