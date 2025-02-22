import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-loader',
	imports: [MatProgressSpinnerModule],
	template: `
		<div class="loader-overlay">
			<mat-spinner></mat-spinner>
		</div>
	`,
	styles: [
		`
			.loader-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 9999;
			}
		`,
	],
})
export class LoaderComponent {}
