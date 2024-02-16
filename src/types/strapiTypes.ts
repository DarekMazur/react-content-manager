export interface IStrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface IStrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}
export interface IStrapiFileTypes {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        large: IStrapiImageFormat;
        small: IStrapiImageFormat;
        medium: IStrapiFileTypes;
        thumbnail: IStrapiImageFormat;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: null;
        provider: string;
        provider_metadata: {
          public_id: string;
          resource_type: string;
          createdAt: Date;
        };
        updatedAt: Date;
      };
    };
  };
}
