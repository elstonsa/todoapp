import { Suspense } from "react";
import { ListView, View, Item, Flex, Text, ActionButton, MenuTrigger, Menu, Button} from '@adobe/react-spectrum';
import { useNavigate } from 'react-router-dom';
import ApplicationHeader from './ApplicationHeader';
import ShowMenu from "@spectrum-icons/workflow/ShowMenu";
import { graphql, useLazyLoadQuery } from "react-relay";

function StatusIcon({ status }) {
  return (
    <span style={{ fontSize: 20 }}>
      {status === 'Completed' ? '✅' : '🕐'}
    </span>
  );
}

function TaskList() {
  const data = useLazyLoadQuery(
    graphql`
      query LandingPageQuery {
        allTasks {
          id
          title
          status
          ...TaskDetailPage_task
        }
      }
    `,
    {}
  );

  const tasks = data?.allTasks?.filter((task) => task != null) || [];

  const navigate = useNavigate();

  const handleTaskClick = (taskId, task) => {
    if (taskId === "no-tasks") {
      navigate('/new-task');
    } else {
      // Navigate using task ID in URL and pass task object in state
      navigate(`/task/${taskId}`, { state: { taskRef: task } });
    }
  };

  if(tasks.length === 0) {
    return (
      <View padding="size-300" maxWidth="600px" margin="0 auto">
        <Flex direction="column" alignItems="center" gap="size-200" marginTop="size-200">
        <Text>No tasks yet. Click Here to add one.</Text>
        <Button onPress={() => handleTaskClick("no-tasks")}>Add New Task</Button>
          </Flex>
      </View>
    );
  }

  return (
    <ListView 
      aria-label="Tasks"
      selectionMode="none"
      width="100%"
      items={tasks}
    >
      {task => 
          <Item
            key={task.id} 
            textValue={`Task ${task.title} is ${task.status}`}
            onAction={() => handleTaskClick(task.id, task)}
          >
            <View>
              <Flex direction="row" alignItems="center" gap="size-100">
                <StatusIcon status={task.status} />
                <Text>{task.title}</Text>
              </Flex>
            </View>
          </Item>
      }
    </ListView>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  function MainMenu({ handleNewTask }) {
    return (
      <Flex gap="size-100" alignItems="center">
        <MenuTrigger>
          <ActionButton aria-label="Main Menu" >
            <ShowMenu />
          </ActionButton>
          <Menu>
            <Item key="New Task" textValue="New Task" aria-label="New Task" onAction={handleNewTask}>New Task</Item>
          </Menu>
        </MenuTrigger>
      </Flex>
    );
  }

  const handleNewTask = () => {
    navigate('/new-task');
  };

  return (
    <ApplicationHeader actionButton={<MainMenu handleNewTask={handleNewTask} />} title="Task List">
      <View colorVersion="6" 
        // borderStartWidth="thicker"
        // borderStartColor="gray-600"
        flexGrow={1}
        padding="size-10"
        overflow="auto"
      >
        <Suspense fallback={<Text>Loading tasks...</Text>}>  
          <TaskList />
        </Suspense>
      </View>
    </ApplicationHeader>
  );
}
