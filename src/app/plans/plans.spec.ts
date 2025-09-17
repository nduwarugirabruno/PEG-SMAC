import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlansComponent} from './plans';

describe('Plans', () => {
    let component: PlansComponent;
    let fixture: ComponentFixture<PlansComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlansComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PlansComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
