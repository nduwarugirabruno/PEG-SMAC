import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCenterComponent} from './admin-center';

describe('AdminCenterComponent', () => {
    let component: AdminCenterComponent;
    let fixture: ComponentFixture<AdminCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminCenterComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
