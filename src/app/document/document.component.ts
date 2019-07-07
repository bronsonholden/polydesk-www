import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  contentLink: string = '';
  contentType: string = '';
  src: any = null;

  constructor(private tokenService: AngularTokenService,
              private domSanitizer: DomSanitizer,
              private location: Location,
              private route: ActivatedRoute,
              private httpClient: HttpClient) { }

  ngOnInit() {
    let docId = this.route.snapshot.params.id;

    this.httpClient.get(`documents/${docId}`).subscribe((res: any) => {
      this.contentType = res.data.attributes.content_type;
      this.contentLink = `${res.data.links.self}/download`;

      let headers = this.tokenService.currentAuthData;

      switch (this.contentType) {
        case 'application/pdf':
          this.src = {
            url: this.contentLink,
            stopAtErrors: true,
            withCredentials: false,
            httpHeaders: {
              'uid': headers.uid,
              'access-token': headers.accessToken,
              'token-type': headers.tokenType,
              'client': headers.client,
              'expiry': headers.expiry
            }
          };
          break;
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          this.httpClient.get(this.contentLink, {
            responseType: 'blob'
          }).subscribe(res => {
            this.createImageFromBlob(res);
          }, err => {
            console.log(err);
          });
          break;
        default:
          ;
      }
    }, err => {
      console.log(err);
    });
  }

  createImageFromBlob(blob: Blob) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      this.src = this.domSanitizer.bypassSecurityTrustUrl(reader.result.toString());
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  contentIsImage() {
    return this.contentType.startsWith('image/') && this.src;
  }

  goBack() {
    this.location.back();
  }

}
