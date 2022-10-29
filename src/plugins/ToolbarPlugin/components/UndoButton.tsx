import * as React from 'react';
import { useContext } from 'react';
import ToolbarContext from '../../../context/ToolbarContext';
import { UNDO_COMMAND } from 'lexical';
import EditorContext from '../../../context/EditorContext';
import { IS_APPLE } from '../../../shared/src/environment';

const UndoButton = () => {
  const { canUndo } = useContext(ToolbarContext);
  const { activeEditor } = useContext(EditorContext);
  return (
    <button
      disabled={!canUndo}
      onClick={() => {
        activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
      }}
      title={IS_APPLE ? `Annuler (⌘Z)` : `Annuler (Ctrl+Z)`}
      className="toolbar-item spaced"
      aria-label="Annuler"
      type="button"
    >
      <i className="format undo" />
    </button>
  );
};

export default UndoButton;
