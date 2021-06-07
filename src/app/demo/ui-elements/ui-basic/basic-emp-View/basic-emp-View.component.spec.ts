/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BasicEmpViewComponent } from './basic-emp-View.component';

describe('BasicEmpViewComponent', () => {
  let component: BasicEmpViewComponent;
  let fixture: ComponentFixture<BasicEmpViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicEmpViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicEmpViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
