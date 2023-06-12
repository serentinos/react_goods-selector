/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component, ReactNode } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

interface State {
  selectedGood: string;
}

export class App extends Component<{}, State> {
  state = {
    selectedGood: 'Jam',
  };

  handleResetSelected = () => {
    this.setState({ selectedGood: '' });
  };

  handleGoodsButton = (listItem: string) => {
    const { selectedGood } = this.state;
    const resetList = this.handleResetSelected;
    const isSelected = listItem === selectedGood;

    if (isSelected) {
      resetList();

      return;
    }

    this.setState({ selectedGood: listItem });
  };

  render(): ReactNode {
    const { selectedGood } = this.state;
    const goodsList = [...goods];

    return (
      <main className="section container">
        <h1 className="title is-flex is-align-items-center">
          {selectedGood
            ? `${selectedGood} is selected`
            : 'No goods selected'}

          {selectedGood && (
            <button
              data-cy="ClearButton"
              type="button"
              onClick={this.handleResetSelected}
              className="delete ml-3"
            />
          )}
        </h1>

        <table className="table">
          <tbody>
            {goodsList.map(item => {
              const isSelected = item === selectedGood;
              const trSelectedLight = classNames({
                'has-background-success-light': isSelected,
              });
              const buttonSelectedBackground = classNames({
                button: true,
                'is-info': isSelected,
              });

              return (
                <tr
                  key={item}
                  data-cy="Good"
                  className={trSelectedLight}
                >
                  <td>
                    <button
                      data-cy={isSelected ? 'RemoveButton' : 'AddButton'}
                      type="button"
                      onClick={() => this.handleGoodsButton(item)}
                      className={buttonSelectedBackground}
                    >
                      {isSelected ? '-' : '+'}
                    </button>
                  </td>

                  <td data-cy="GoodTitle" className="is-vcentered">
                    {item}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}
