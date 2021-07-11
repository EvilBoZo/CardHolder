import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Card from './card'
import { ICard } from './models/card-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, TextField } from '@material-ui/core';
import db from './db'
import React from 'react';

interface IProps {
  cards: Array<ICard>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }),
);

function CardList(props: IProps) {
    const cardItems = props.cards != null ? props.cards.map((card) => 
      <Card card={card} />
    ) : null;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [barcode, setBarcode] = React.useState("");
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = async () => {
      await db.cards.put({name: name, barcode: barcode});
      setOpen(false);
    };

    const onNameChange = (e: any) => {
      setName(e.target.value);
    };

    const onBarcodeChange = (e: any) => {
      setBarcode(e.target.value);
    };

    return (
      <div>
        <List className={classes.root}>{cardItems}</List>
        <IconButton aria-label='add' onClick={handleOpen}>
          <Icon style={{ fontSize: 30 }}>add_circle</Icon>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            onChange={onNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Barcode"
            type="email"
            fullWidth
            onChange={onBarcodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }

  export default CardList;