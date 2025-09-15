
import { graphql, useFragment, useMutation } from "react-relay";
import { Flex, Switch, Button, ActionButton, View, Text } from '@adobe/react-spectrum';
import { useNavigate, useLocation } from 'react-router-dom';
import ApplicationHeader from './ApplicationHeader';
import ChevronDoubleLeft from "@spectrum-icons/workflow/ChevronDoubleLeft";

export const taskFragment = graphql`
  fragment TaskDetailPage_task on TaskItem {
    id
    title
    description
    status
  }
`;

function ActionButtonBack({ onPress }) {
  return (
    <ActionButton aria-label="Go Back" onPress={onPress}>
      <ChevronDoubleLeft />
    </ActionButton>
  );
}

const isTaskComplete = (status) => status === 'Completed';

export default function TaskDetailPage() {
  const navigate = useNavigate();
  // Get fragment reference from navigation state using useLocation
  const location = useLocation();
  const state = location.state || {};
  const taskRef = state.taskRef;
  const task = useFragment(taskFragment, taskRef);
  const [commitMutation, isMutationInFlight] = useMutation(
    graphql`
      mutation TaskDetailPageMutation($id: String!, $status: String!) {
        updateTaskStatus(id: $id, status: $status) {
          id
          title
          description
          status
        }
      }
    `
  );


  if (!task) {
    return (
      <View padding="size-300" maxWidth="600px" margin="0 auto">
        <Text>Task not found</Text>
        <Button onPress={() => navigate('/')}>Go Back</Button>
      </View>
    );
  }

  const handleToggleButton = (isSelected) => {
    const newStatus = isSelected ? 'Completed' : 'Pending';
    commitMutation({
      variables: {
        id: task.id,
        status: newStatus
      },
      onCompleted: (response, errors) => {
        if (errors) {
          console.error('Mutation errors:', errors);
          return;
        }
        console.log("Updated task:", response.updateTaskStatus);
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    });
  };

  return (
    <ApplicationHeader actionButton={<ActionButtonBack onPress={() => navigate('/')} />} title={task.title}>
      <Flex direction="column" flexGrow={1}>
        {/* Description Section - Gray theme background */}
        <View
          // borderStartWidth="thicker"
          // borderStartColor="gray-600"
           flexGrow={1}
           padding="size-50"
        >
          <Text >
            {task.description || 'No description provided'}
          </Text>
        </View>

        {/* Status Toggle Section - Green theme background */}
        <View
        colorVersion={6}
          backgroundColor={isTaskComplete(task.status) ? "green-500" : "orange-500"}
          // borderStartWidth="thicker"
          // borderStartColor="gray-600"
          padding="size-100"
          flexGrow={0}>
          <Switch
            isSelected={isTaskComplete(task.status)}
            onChange={handleToggleButton}
            isDisabled={isMutationInFlight}
          >
            <Text color="static-white">
              {task.status}
            </Text>
          </Switch>
        </View>
      </Flex>
    </ApplicationHeader>

  );
}
