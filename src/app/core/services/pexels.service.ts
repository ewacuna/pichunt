import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  IFeaturedCollection,
  IPexelsCollectionData,
  IPexelsPhoto,
  IPexelsPhotoList,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  constructor(private httpClient: HttpClient) {}

  public searchQuery(
    query: string,
    page: number,
    params?: HttpParams
  ): Observable<IPexelsPhotoList> {
    return this.httpClient.get<IPexelsPhotoList>(
      `search?query=${query}&page=${page}`,
      {responseType: 'json', params}
    );
  }

  public getCuratedPhotos(page: number): Observable<IPexelsPhotoList> {
    return this.httpClient.get<IPexelsPhotoList>(`curated?page=${page}`);
  }

  public getPhotoById(photoId: string): Observable<IPexelsPhoto> {
    return this.httpClient.get<IPexelsPhoto>(`photos/${photoId}`);
  }

  public getFeaturedCollections(
    page?: number,
    perPage?: number
  ): Observable<IFeaturedCollection> {
    return this.httpClient.get<IFeaturedCollection>(
      `collections/featured?page=${page || 1}&per_page=${perPage || 15}`
    );
  }

  public getCollection(
    collectionId: string,
    page?: number,
    perPage?: number
  ): Observable<IPexelsCollectionData> {
    return this.httpClient.get<IPexelsCollectionData>(
      `collections/${collectionId}?page=${page || 1}&per_page=${perPage || 5}`
    );
  }
}
