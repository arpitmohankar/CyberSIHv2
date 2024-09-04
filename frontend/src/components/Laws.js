import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import './Laws.css';

const Laws = () => {
  return (
    <Box className="laws-container">
      <Typography variant="h4" gutterBottom>
        Indian Cybercrime Laws
      </Typography>

      <Paper className="laws-paper">
        <Typography variant="h5" gutterBottom>
          Laws under the Indian Penal Code (IPC)
        </Typography>
        <Typography className="laws-typography"><strong>Sec. 503 IPC:</strong> Sending threatening messages by e-mail</Typography>
        <Typography className="laws-typography"><strong>Sec. 509 IPC:</strong> Word, gesture, or act intended to insult the modesty of a woman</Typography>
        <Typography className="laws-typography"><strong>Sec. 499 IPC:</strong> Sending defamatory messages by e-mail</Typography>
        <Typography className="laws-typography"><strong>Sec. 420 IPC:</strong> Bogus websites, Cyber Frauds</Typography>
        <Typography className="laws-typography"><strong>Sec. 463 IPC:</strong> E-mail Spoofing</Typography>
        <Typography className="laws-typography"><strong>Sec. 464 IPC:</strong> Making a false document</Typography>
        <Typography className="laws-typography"><strong>Sec. 468 IPC:</strong> Forgery for the purpose of cheating</Typography>
        <Typography className="laws-typography"><strong>Sec. 469 IPC:</strong> Forgery for the purpose of harming reputation</Typography>
      </Paper>

      <Paper className="laws-paper">
        <Typography variant="h5" gutterBottom>
          Laws under the Information Technology Act (IT Act)
        </Typography>
        <Typography className="laws-typography"><strong>Sec. 65:</strong> Tampering with computer source documents</Typography>
        <Typography className="laws-typography"><strong>Sec. 66:</strong> Hacking with computer systems, Data Alteration</Typography>
        <Typography className="laws-typography"><strong>Sec. 66A:</strong> Sending offensive messages through communication service, etc.</Typography>
        <Typography className="laws-typography"><strong>Sec. 66B:</strong> Dishonestly receiving stolen computer resources or communication devices</Typography>
        <Typography className="laws-typography"><strong>Sec. 66C:</strong> Identity theft</Typography>
        <Typography className="laws-typography"><strong>Sec. 66D:</strong> Cheating by personation by using computer resources</Typography>
        <Typography className="laws-typography"><strong>Sec. 66E:</strong> Violation of privacy</Typography>
        <Typography className="laws-typography"><strong>Sec. 66F:</strong> Cyber terrorism</Typography>
        <Typography className="laws-typography"><strong>Sec. 67:</strong> Publishing or transmitting obscene material in electronic form</Typography>
        <Typography className="laws-typography"><strong>Sec. 67A:</strong> Publishing or transmitting material containing sexually explicit acts, etc., in electronic form</Typography>
        <Typography className="laws-typography"><strong>Sec. 67B:</strong> Punishment for publishing or transmitting material depicting children in sexually explicit acts, etc., in electronic form</Typography>
        <Typography className="laws-typography"><strong>Sec. 67C:</strong> Preservation and Retention of information by intermediaries</Typography>
        <Typography className="laws-typography"><strong>Sec. 69:</strong> Powers to issue directions for interception or monitoring or decryption of any information through any computer resource</Typography>
        <Typography className="laws-typography"><strong>Sec. 69A:</strong> Power to issue directions for blocking public access to any information through any computer resource</Typography>
        <Typography className="laws-typography"><strong>Sec. 69B:</strong> Power to authorize monitoring and collect traffic data for Cyber Security</Typography>
        <Typography className="laws-typography"><strong>Sec. 70:</strong> Unauthorized access to protected systems</Typography>
        <Typography className="laws-typography"><strong>Sec. 71:</strong> Penalty for misrepresentation</Typography>
        <Typography className="laws-typography"><strong>Sec. 72:</strong> Breach of confidentiality and privacy</Typography>
        <Typography className="laws-typography"><strong>Sec. 73:</strong> Publishing False digital signature certificates</Typography>
        <Typography className="laws-typography"><strong>Sec. 74:</strong> Publication for fraudulent purposes</Typography>
        <Typography className="laws-typography"><strong>Sec. 75:</strong> Act to apply for offenses or contraventions committed outside India</Typography>
        <Typography className="laws-typography"><strong>Sec. 77:</strong> Compensation, penalties, or confiscation not to interfere with other punishments</Typography>
        <Typography className="laws-typography"><strong>Sec. 77A:</strong> Compounding of Offenses</Typography>
        <Typography className="laws-typography"><strong>Sec. 77B:</strong> Offenses with three years imprisonment to be cognizable</Typography>
        <Typography className="laws-typography"><strong>Sec. 79:</strong> Exemption from liability of intermediary in certain cases</Typography>
        <Typography className="laws-typography"><strong>Sec. 84B:</strong> Punishment for abetment of offenses</Typography>
        <Typography className="laws-typography"><strong>Sec. 84C:</strong> Punishment for attempting to commit offenses</Typography>
        <Typography className="laws-typography"><strong>Sec. 85:</strong> Offenses by Companies</Typography>
      </Paper>

      <Paper className="laws-paper">
        <Typography variant="h5" gutterBottom>
          Additional Cybercrime Resources
        </Typography>
        <Typography className="laws-typography">
          <a href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer" className="laws-link">Ministry of Electronics and Information Technology (MeitY)</a>
        </Typography>
        <Typography className="laws-typography">
          <a href="https://www.cert-in.org.in/" target="_blank" rel="noopener noreferrer" className="laws-link">Indian Computer Emergency Response Team (CERT-IN)</a>
        </Typography>
        <Typography className="laws-typography">
          <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="laws-link">Cyber Crime Portal (Government of India)</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Laws;
