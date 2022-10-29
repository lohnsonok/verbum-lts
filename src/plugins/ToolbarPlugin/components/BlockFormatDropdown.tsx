import { $createCodeNode } from '@lexical/code';
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from 'lexical';
import React, { useContext } from 'react';
import EditorContext from '../../../context/EditorContext';
import DropDown from '../../../ui/DropDown';
import ToolbarContext from '../../../context/ToolbarContext';

const blockTypeToBlockName = {
  bullet: 'Liste à puces',
  check: 'Liste de contrôle',
  code: 'Bloc de code',
  h1: 'Titre 1',
  h2: 'Titre 2',
  h3: 'Titre 3',
  h4: 'Titre 4',
  h5: 'Titre 5',
  number: 'Liste numérotée',
  paragraph: 'Normal',
  quote: 'Citation',
};

const BlockFormatDropdown = () => {
  const { initialEditor } = useContext(EditorContext);
  const { blockType } = useContext(ToolbarContext);
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      initialEditor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      initialEditor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () =>
            $createHeadingNode(headingSize)
          );
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      initialEditor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      initialEditor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== 'check') {
      initialEditor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      initialEditor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      initialEditor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      initialEditor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      initialEditor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      initialEditor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.removeText();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <DropDown
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={'icon block-type ' + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Options de mise en forme pour le style de texte"
    >
      <button className="item" onClick={formatParagraph} type="button">
        <span className="icon paragraph" />
        <span className="text">
          Normal
        </span>
        {blockType === 'paragraph' && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatHeading('h1')} type="button">
        <span className="icon h1" />
        <span className="text">
          Titre 1
        </span>
        {blockType === 'h1' && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatHeading('h2')} type="button">
        <span className="icon h2" />
        <span className="text">
          Titre 2
        </span>
        {blockType === 'h2' && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatHeading('h3')} type="button">
        <span className="icon h3" />
        <span className="text">
          Titre 3
        </span>
        {blockType === 'h3' && <span className="active" />}
      </button>
      <button className="item" onClick={formatBulletList} type="button">
        <span className="icon bullet-list" />
        <span className="text">
          Liste à puces
        </span>
        {blockType === 'bullet' && <span className="active" />}
      </button>
      <button className="item" onClick={formatNumberedList} type="button">
        <span className="icon numbered-list" />
        <span className="text">
          Liste numérotée
        </span>
        {blockType === 'number' && <span className="active" />}
      </button>
      <button className="item" onClick={formatCheckList} type="button">
        <span className="icon check-list" />
        <span className="text">
          Liste de contrôle
        </span>
        {blockType === 'check' && <span className="active" />}
      </button>
      <button className="item" onClick={formatQuote} type="button">
        <span className="icon quote" />
        <span className="text">
          Citation
        </span>
        {blockType === 'quote' && <span className="active" />}
      </button>
      <button className="item" onClick={formatCode} type="button">
        <span className="icon code" />
        <span className="text">
          Bloc de code
        </span>
        {blockType === 'code' && <span className="active" />}
      </button>
    </DropDown>
  );
};

export default BlockFormatDropdown;
