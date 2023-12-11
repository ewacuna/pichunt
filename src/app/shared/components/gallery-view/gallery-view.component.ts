import {Component, Input, OnInit} from '@angular/core';
import {IPexelsPhoto} from '../../models';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent implements OnInit {
  // Inputs / Outputs
  @Input() photos: IPexelsPhoto[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  public trackByPhotoId(index: number, item: IPexelsPhoto): number {
    return item.id;
  }
}
