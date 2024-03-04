import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import {
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import {
  Image,
  ImageUpload,
  ImageToolbar,
  ImageStyle,
  ImageResize,
  ImageCaption,
  ImageResizeButtons,
  ImageResizeEditing,
} from '@ckeditor/ckeditor5-image';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading, Title } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';

const token = localStorage.getItem('jwt');

function uploadAdapter(loader: { file: Promise<string | Blob> }) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file: string | Blob) => {
          body.append('files', file);
          fetch(`${import.meta.env.VITE_API_URL}upload`, {
            method: 'post',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: body,
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              resolve({
                default: `${res[0].url}`,
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: {
    file: Promise<string | Blob>;
  }) => {
    return uploadAdapter(loader);
  };
}

export const editorConfiguration = {
  extraPlugins: [uploadPlugin],
  plugins: [
    Alignment,
    Essentials,
    Bold,
    Italic,
    Underline,
    Paragraph,
    Strikethrough,
    Subscript,
    Superscript,
    BlockQuote,
    Heading,
    Link,
    List,
    Image,
    ImageUpload,
    ImageToolbar,
    ImageStyle,
    ImageResize,
    ImageCaption,
    ImageResizeButtons,
    ImageResizeEditing,
    Title,
  ],
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'alignment',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'code',
      '|',
      'link',
      'uploadImage',
      'blockQuote',
      'codeBlock',
      '|',
      'bulletedList',
      'numberedList',
    ],
    shouldNotGroupWhenFull: false,
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage:100',
      'resizeImage:200',
      'resizeImage:original',
    ],
    resizeUnit: 'px',
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:100',
        label: '100px',
        value: '100',
        icon: 'medium',
      },
      {
        name: 'resizeImage:200',
        label: '200px',
        value: '200',
        icon: 'large',
      },
    ],
  },
};
