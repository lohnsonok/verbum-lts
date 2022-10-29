import { FORMAT_TEXT_COMMAND } from 'lexical';
import React, { useContext } from 'react';
import DropDown from '../../../ui/DropDown';
import EditorContext from '../../../context/EditorContext';
import ToolbarContext from '../../../context/ToolbarContext';

const TextFormatDropdown = () => {
  const { activeEditor } = useContext(EditorContext);
  const { isStrikethrough, isSubscript, isSuperscript } =
    useContext(ToolbarContext);
  return (
    <DropDown
      buttonClassName="toolbar-item spaced"
      buttonLabel=""
      buttonAriaLabel="Options de formatage pour les styles de texte supplémentaires"
      buttonIconClassName="icon dropdown-more"
    >
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={
          'item ' + (isStrikethrough ? 'active dropdown-item-active' : '')
        }
        title="Barré"
        aria-label="Formater le texte avec une barre oblique"
        type="button"
      >
        <i className="icon strikethrough" />
        <span className="text">Barré</span>
      </button>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
        }}
        className={'item ' + (isSubscript ? 'active dropdown-item-active' : '')}
        title="Indice"
        aria-label="Formater le texte avec un indice"
        type="button"
      >
        <i className="icon subscript" />
        <span className="text">Indice</span>
      </button>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        }}
        className={
          'item ' + (isSuperscript ? 'active dropdown-item-active' : '')
        }
        title="Exposant"
        aria-label="Formater le texte avec un exposant"
        type="button"
      >
        <i className="icon superscript" />
        <span className="text">Exposant</span>
      </button>
    </DropDown>
  );
};

export default TextFormatDropdown;
