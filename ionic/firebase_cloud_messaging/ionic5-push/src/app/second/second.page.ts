import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-second',
    templateUrl: './second.page.html',
    styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

    price: any = '';

    constructor(private route: ActivatedRoute) {
        this.price = this.route.snapshot.params['price'];
    }

    ngOnInit() {
    }

}
