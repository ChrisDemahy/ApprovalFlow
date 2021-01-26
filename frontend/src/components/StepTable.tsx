import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Icon, Loader, Table } from 'semantic-ui-react';
import { getProject, getWorkflowRun } from '../shared/api';
import type { Workflowrun } from '../types/workflowrun';
import type Step from '../types/step';
import type Project from 'src/types/project';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheck,
  faTimes,
  faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons';

const StepTable = ({ steps }: { steps: Step[] }) => {
  const statusMessage = (status: string) => {
    if (status == 'approved') {
      return 'Approved';
    } else if (status == 'denied') {
      return 'Denied';
    } else if (status == 'pending') {
      return 'Action Required';
    } else if (status == 'created') {
      return '';
    }
  };

  const formatDate = (date_string: string) => {
    const d = Date.parse(date_string);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  };

  return (
    <>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Assignment Date</Table.HeaderCell>
            <Table.HeaderCell>Date Finished</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {steps.map((step) => (
            <Table.Row
              key={step.id}
              positive={step.status == 'approved'}
              negative={step.status == 'denied'}
              warning={step.status == 'pending'}
            >
              {/* Icons to show status of the project */}
              <Table.Cell collapsing>
                {step.status === 'created' && (
                  <FontAwesomeIcon
                    style={{
                      height: '20px',
                      width: '20px',
                    }}
                    icon={faHourglassEnd}
                  />
                )}
                {step.status === 'pending' && (
                  <FontAwesomeIcon
                    style={{
                      height: '20px',
                      width: '20px',
                    }}
                    icon={faExclamationTriangle}
                  />
                )}
                {step.status === 'approved' && (
                  <FontAwesomeIcon
                    style={{
                      height: '20px',
                      width: '20px',
                    }}
                    icon={faCheck}
                  />
                )}
                {step.status === 'denied' && (
                  <FontAwesomeIcon
                    style={{
                      height: '20px',
                      width: '20px',
                    }}
                    icon={faTimes}
                  />
                )}
              </Table.Cell>
              <Table.Cell>{statusMessage(step.status)}</Table.Cell>
              <Table.Cell>{step.name}</Table.Cell>

              {!!step.authorizations &&
              !!step.authorizations[step.authorizations.length - 1] ? (
                <>
                  <Table.Cell>
                    {/* If step has an authorization it has been assigned for approval */}
                    {formatDate(
                      step.authorizations[step.authorizations.length - 1]
                        .created_at,
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {/* If the status is approved/denied show the date finished */}
                    {(step.status === 'approved' || step.status === 'denied') &&
                      formatDate(
                        step.authorizations[step.authorizations.length - 1]
                          .created_at,
                      )}
                  </Table.Cell>
                </>
              ) : (
                <>
                  <Table.Cell>
                    {/* If step has no authorization, it has not been assigned */}
                  </Table.Cell>
                  <Table.Cell>
                    {/* If the status is not approved/denied, the step can't have
                     a date finished */}
                  </Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
              >
                <Icon name="user" /> Add User
              </Button>
              <Button size="small">Approve</Button>
              <Button disabled size="small">
                Approve All
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default StepTable;
