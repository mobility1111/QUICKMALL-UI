
import { Component, Input, OnChanges } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnChanges {
  @Input() imageString: string | null = null;
  @Input() width: number | null = 200;
  @Input() height: number | null = 200;

  imageUrl: string | null = null;

  constructor(private imageService: ImageService) {}

  ngOnChanges() {
    this.updateImageUrl();
  }

  private updateImageUrl() {
    this.imageUrl = this.imageString
      ? `data:image/jpeg;base64,${this.imageString}`
      : null;
  }
}