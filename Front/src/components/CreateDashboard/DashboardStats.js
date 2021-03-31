import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Segment, Header, Table } from 'semantic-ui-react';

const DashboardStats = ({
  nbBlocks,
  nbChoices,
  nbEndBlock,
  nbLinkedChoices,
  nbUnlinkedChoices,
  setUnpublishable,
  storyStatus,
}) => {
  useEffect(() => {
    setUnpublishable(nbUnlinkedChoices > 0 || nbEndBlock === 0);
  });

  const storyStatusDisplay = () => {
    switch (storyStatus) {
      case 1:
        return 'Histoire en cours d\'écriture';

      case 3:
        return 'Histoire publiée';

      default:
        return 'Nouvelle histoire';
    }
  };

  return (
    <Segment>
      <Header size="medium">Statistiques</Header>
      <Header sub color={storyStatus === 3 ? 'green' : 'orange'}>{storyStatusDisplay()}</Header>
      <Table celled columns={2} unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre de blocs</Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> {nbBlocks} </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row negative={nbEndBlock === 0}>
            <Table.Cell>Nombre de fins</Table.Cell>
            <Table.Cell textAlign="center">{nbEndBlock}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table celled columns={2} unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre de choix</Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> {nbChoices} </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Connectés</Table.Cell>
            <Table.Cell textAlign="center"> {nbLinkedChoices} </Table.Cell>
          </Table.Row>
          <Table.Row negative={nbUnlinkedChoices > 0}>
            <Table.Cell>Non connectés</Table.Cell>
            <Table.Cell textAlign="center"> {nbUnlinkedChoices} </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

DashboardStats.defaultProps = {
  storyStatus: null,
};

DashboardStats.propTypes = {
  nbBlocks: PropTypes.number.isRequired,
  nbChoices: PropTypes.number.isRequired,
  nbEndBlock: PropTypes.number.isRequired,
  nbLinkedChoices: PropTypes.number.isRequired,
  nbUnlinkedChoices: PropTypes.number.isRequired,
  setUnpublishable: PropTypes.func.isRequired,
  storyStatus: PropTypes.number,
};

export default DashboardStats;
