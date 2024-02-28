import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISearchFilter} from '../../models';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent implements OnInit {
  // Outputs
  @Input() currentFilters: ISearchFilter[] = [];
  @Output() selectedFilters = new EventEmitter<ISearchFilter[]>();

  // Properties
  public orientationFilters: ISearchFilter[] = [
    {
      label: 'filters.all_orientation',
      isSelected: true,
      type: 'orientation',
      value: '',
    },
    {
      label: 'filters.portrait',
      isSelected: false,
      type: 'orientation',
      value: 'portrait',
    },
    {
      label: 'filters.landscape',
      isSelected: false,
      type: 'orientation',
      value: 'landscape',
    },
    {
      label: 'filters.square',
      isSelected: false,
      type: 'orientation',
      value: 'square',
    },
  ];
  public sizeFilters: ISearchFilter[] = [
    {
      label: 'filters.all_sizes',
      isSelected: true,
      type: 'size',
      value: '',
    },
    {
      label: 'filters.large',
      isSelected: false,
      type: 'size',
      value: 'large',
    },
    {
      label: 'filters.medium',
      isSelected: false,
      type: 'size',
      value: 'medium',
    },
    {
      label: 'filters.small',
      isSelected: false,
      type: 'size',
      value: 'small',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.currentFilters && this.currentFilters.length > 0) {
      this.currentFilters.forEach((filter: ISearchFilter): void => {
        const filters: ISearchFilter[] =
          filter.type === 'orientation'
            ? this.orientationFilters
            : this.sizeFilters;

        filters.forEach(
          (item: ISearchFilter): boolean =>
            (item.isSelected = item.label === filter.label)
        );
      });
    }
  }

  public onSelectOrientation(orientation: ISearchFilter, type: string): void {
    const filters: ISearchFilter[] =
      type === 'orientation' ? this.orientationFilters : this.sizeFilters;

    filters.forEach(
      (filter: ISearchFilter): boolean =>
        (filter.isSelected = filter.label === orientation.label)
    );
  }

  public onApplyFilters(): void {
    const selectedOrientationFilter = this.orientationFilters.find(
      (f: ISearchFilter) => f.isSelected
    );
    const selectedSizeFilter = this.sizeFilters.find(
      (f: ISearchFilter) => f.isSelected
    );

    const filters: ISearchFilter[] = [];
    selectedOrientationFilter && filters.push(selectedOrientationFilter);
    selectedSizeFilter && filters.push(selectedSizeFilter);
    this.selectedFilters.emit(filters);
  }
}
