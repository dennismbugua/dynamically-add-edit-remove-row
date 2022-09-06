import * as React from "react";
import { v4 as uuid } from "uuid";
import Button from "./components/Button";
import Input from "./components/Input";
import Switch from "./components/Switch";
import "./styles.css";

export default function App() {
  const [list, setList] = React.useState([]);
  const [editRow, setEditRow] = React.useState({
    id: "",
    value: ""
  });
  const [newRowValue, setNewRowValue] = React.useState("");
  const [newRowIsEditable, setNewRowEditable] = React.useState(true);
  const [newRowIsRemovable, setNewRowRemovable] = React.useState(true);

  const removeItem = (removeId) => {
    setList((prevState) => prevState.filter(({ id }) => id !== removeId));
  };

  const editItem = (editId) => {
    const { name } = list.find((item) => item.id === editId);
    setEditRow({ id: editId, value: name });
  };

  const updateRowItem = ({ target: { value } }) => {
    setEditRow((prevState) => ({ ...prevState, value }));
  };

  const handleRowUpdate = (e) => {
    e.preventDefault();

    const { id, value } = editRow;

    if (!value) {
      alert("Please fill out the row input before updating the row!");
      return;
    }

    setList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
    setEditRow({ id: "", value: "" });
  };

  const addNewRowItem = (e) => {
    e.preventDefault();

    if (!newRowValue) {
      alert("Please fill out the new row item before submitting the form!");
      return;
    }

    setList((prevState) => [
      ...prevState,
      {
        id: uuid(),
        name: newRowValue,
        isEditable: newRowIsEditable,
        isRemovable: newRowIsRemovable
      }
    ]);
    setNewRowValue("");
    setNewRowEditable(true);
    setNewRowRemovable(true);
  };

  return (
    <div className="app">
      <h1>Dynamically Add/Edit/Remove Row</h1>
      {list.length > 0 ? (
        list.map(({ id, name, isEditable, isRemovable }) => (
          <div className="uk-card uk-card-default uk-card-body" key={id}>
            {editRow.id === id ? (
              <form onSubmit={handleRowUpdate}>
                <Input
                  placeholder="Add a new row..."
                  value={editRow.value}
                  handleChange={updateRowItem}
                />
                <Button color="secondary" type="submit">
                  Update Row
                </Button>
              </form>
            ) : (
              <>
                <h2 className="uk-card-title">{name}</h2>
                {isEditable && (
                  <Button
                    className="uk-margin-small-bottom"
                    color="primary"
                    type="button"
                    handleClick={() => editItem(id)}
                  >
                    Edit
                  </Button>
                )}
                {isRemovable && (
                  <Button
                    color="danger"
                    type="button"
                    handleClick={() => removeItem(id)}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div>(Empty List)</div>
      )}
      <form
        className="uk-card uk-card-default uk-card-body"
        onSubmit={addNewRowItem}
      >
        <Input
          placeholder="Add a new row..."
          value={newRowValue}
          handleChange={(e) => setNewRowValue(e.target.value)}
        />
        <Switch
          label="Editable"
          handleChange={(e) => setNewRowEditable(Boolean(e.target.checked))}
          name="Editable"
          value={newRowIsEditable}
        />
        <Switch
          label="Removable"
          handleChange={(e) => setNewRowRemovable(Boolean(e.target.checked))}
          name="Removable"
          value={newRowIsRemovable}
        />
        <Button
          className="uk-margin-small-bottom"
          color="secondary"
          type="submit"
        >
          Add Row
        </Button>
        <Button color="danger" type="button" handleClick={() => setList([])}>
          Reset List
        </Button>
      </form>
    </div>
  );
}
