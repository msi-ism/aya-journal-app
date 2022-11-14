import React from 'react';
import {useSubmit} from 'react'
import './TextEditor.css'
import '../../node_modules/draft-js/dist/Draft.css'
import {Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw} from 'draft-js'
import headingIco from './icons/heading.png'
import numlistIco from './icons/numlist.png'
import listIco from './icons/list.png'
import italicsIco from './icons/italics.png'
import boldIco from './icons/bold.png'
import underlineIco from './icons/underline-text.png'
import * as submitPage from '../utilities/notes-api'
import { json } from 'react-router-dom';


class TextEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => this.setState({editorState});

      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _mapKeyToEditorCommand(e) {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }


    render() {
      const {editorState} = this.state;
      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      let contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }


      let noteBody = editorState.getCurrentContent()
      let jsonBody = JSON.stringify(convertToRaw(contentState))
      console.log(noteBody.getPlainText())
      console.log(jsonBody)
      this.props.setBody(jsonBody)

      return (
        <div className="RichEditor-root">
            <div className='edit-controls'>
            <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
            />
             </div>
          <div className={className} onClick={this.focus}>

            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell your story..."
              // ^ Below line of code causing 'ref string' bug. Need to figure out why.
              ref="editor"
              spellCheck={true}
            />
            <button className='editor-submit-btn' type='submit' label='Submit'>Submit</button>
          </div>
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <div className={className} onMouseDown={this.onToggle}>
          <img className='ico-img' src={this.props.img}></img>
        </div>
      );
    }
  }

  const BLOCK_TYPES = [
    // {label: 'H1', style: 'header-one'},
    {label: 'H1', style: 'header-two', img: headingIco},
    // {label: 'H3', style: 'header-three'},
    // {label: 'H4', style: 'header-four'},
    // {label: 'H5', style: 'header-five'},
    // {label: 'H6', style: 'header-six'},
    // {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item', img: listIco},
    {label: 'OL', style: 'ordered-list-item', img: numlistIco},
  ];

  let INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', img: boldIco},
    {label: 'Italic', style: 'ITALIC', img: italicsIco},
    {label: 'Underline', style: 'UNDERLINE', img: underlineIco},
    // {label: 'Monospace', style: 'CODE'},
  ];


  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            img={type.img}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };


  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            img={type.img}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

export default TextEditor;
