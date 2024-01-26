import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import {
  Bold,
  Italic,
  Code,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading, Title } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { List } from '@ckeditor/ckeditor5-list';
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

export const editorConfiguration = {
  plugins: [
    Alignment,
    Essentials,
    Bold,
    Italic,
    Underline,
    Paragraph,
    Code,
    Strikethrough,
    Subscript,
    Superscript,
    BlockQuote,
    Heading,
    Link,
    List,
    CodeBlock,
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
