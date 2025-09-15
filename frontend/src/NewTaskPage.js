import { useState } from 'react';
import { Flex, TextField, Button, TextArea, View } from '@adobe/react-spectrum';
import { useNavigate } from 'react-router-dom';
import ApplicationHeader from './ApplicationHeader';
import { graphql, useMutation } from "react-relay";

export default function NewTaskPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [commitMutation, isMutationInFlight] = useMutation(
    graphql`
      mutation NewTaskPageMutation($title: String!, $description: String!) {
        createTask(title: $title, description: $description, status: "Pending") {
          id
          title
          description
          status
        }
      }
    `
  );

  const handleSave = () => {
    if (!title.trim()) return;

    commitMutation({
      variables: {
        title: title.trim(),
        description: description?.trim() || ''
      },
      updater: (store) => {
        // Update Relay cache to add new task to the list
        const root = store.getRoot();
        const newTask = store.getRootField('createTask');
        if (newTask) {
          const allTasks = root.getLinkedRecords('allTasks') || [];
          root.setLinkedRecords([...allTasks, newTask], 'allTasks');
        }
      },
      onCompleted: (response, errors) => {
        if (errors) {
          console.error('Mutation errors:', errors);
          return;
        }
        console.log("Added task:", response.createTask);
        navigate('/');
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    });
  };

  const handleDiscard = () => {
    navigate('/');
  };

  return (
    <ApplicationHeader actionButton={<></>} title="Create New Task">
    <View padding="size-300" flexGrow={1} 
    //borderStartWidth={"thicker"} borderStartColor="gray-600"
    >
      <Flex direction="column" gap="size-100" height={"100%"}>
        <TextField
          label="Task Title"
          value={title}
          onChange={setTitle}
          isRequired
          width="100%"
          flexGrow={0}
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          width="100%"
          flexGrow={1}
        />
        <Flex direction="row" gap="size-200" justifyContent="flex-end" flexGrow={0}>
          <Button variant="secondary" onPress={handleDiscard}>
            Discard
          </Button>
          <Button 
            variant="cta" 
            onPress={handleSave} 
            isDisabled={!title.trim() || isMutationInFlight}
          >
            {isMutationInFlight ? 'Saving...' : 'Save'}
          </Button>
        </Flex>
      </Flex>
    </View>
    </ApplicationHeader>
  );
}
