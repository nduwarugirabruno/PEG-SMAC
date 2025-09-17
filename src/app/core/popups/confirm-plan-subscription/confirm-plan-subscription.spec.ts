import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmPlanSubscription} from './confirm-plan-subscription';

describe('ConfirmPlanSubscription', () => {
    let component: ConfirmPlanSubscription;
    let fixture: ComponentFixture<ConfirmPlanSubscription>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmPlanSubscription]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ConfirmPlanSubscription);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
