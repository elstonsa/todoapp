/**
 * @generated SignedSource<<1e4080844d15cb71846ab09924a2c911>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Literal",
        "name": "status",
        "value": "Pending"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewTaskPageMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NewTaskPageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "147c03de593aa1245a3a2d5f28845c24",
    "id": null,
    "metadata": {},
    "name": "NewTaskPageMutation",
    "operationKind": "mutation",
    "text": "mutation NewTaskPageMutation(\n  $title: String!\n  $description: String!\n) {\n  createTask(title: $title, description: $description, status: \"Pending\") {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

node.hash = "0980abb0f9e89a08878f25d0119fddec";

export default node;
