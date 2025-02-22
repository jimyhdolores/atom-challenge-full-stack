import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	private overlayRef: OverlayRef | null = null;
	private readonly overlay = inject(Overlay);

	show(): void {
		if (!this.overlayRef) {
			this.overlayRef = this.overlay.create({ hasBackdrop: true });

			const componentPortal = new ComponentPortal(LoaderComponent);
			this.overlayRef.attach(componentPortal);
		}
	}

	hide(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
			this.overlayRef.dispose();
			this.overlayRef = null;
		}
	}
}
