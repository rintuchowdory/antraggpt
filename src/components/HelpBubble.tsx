import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const HelpBubble: React.FC<{ text: string }> = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="help-bubble" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <HelpCircle size={14} />
      {show && <span className="help-tooltip">{text}</span>}
    </span>
  );
};

export default HelpBubble;
