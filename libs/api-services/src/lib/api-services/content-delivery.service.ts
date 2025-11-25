import { Injectable } from '@angular/core';
import { KickbaseApi } from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class ContentDeliveryService {
  cdnUrl(cdnPath: string): string {
    return KickbaseApi.KICKBASE_CONTENT_URL + cdnPath;
  }
}
