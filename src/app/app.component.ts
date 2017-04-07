import { Component } from '@angular/core';
import 'jsonforms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSONForms Angular Seed!';
  private schema = {
    'type': 'object',
    'properties': {
      'name': {
        'type': 'string',
        'minLength': 3
      },
      'personalData': {
        'type': 'object',
        'properties': {
          'age': {
            'type': 'integer'
          },
          'height': {
            'type': 'number'
          }
        },
        'required': ['age', 'height']
      },
      'vegetarian': {
        'type': 'boolean'
      },
      'birthDate': {
        'type': 'string',
        'format': 'date'
      },
      'nationality': {
        'type': 'string',
        'enum': ['DE', 'IT', 'JP', 'US', 'RU', 'Other']
      },
      'occupation': {
        'type': 'string'
      }
    },
    'required': ['occupation', 'nationality']
  };
  private uischema = {
    'type': 'VerticalLayout',
    'elements': [
      {
        'type': 'HorizontalLayout',
        'elements': [
          {
            'type': 'Control',
            'label': {
              'text': 'Name',
              'show': true
            },
            'scope': {
              '$ref': '#/properties/name'
            }
          },
          {
            'type': 'Control',
            'label': {
              'text': 'Age'
            },
            'scope': {
              '$ref': '#/properties/personalData/properties/age'
            }
          },
          {
            'type': 'Control',
            'label': 'Height',
            'scope': {
              '$ref': '#/properties/personalData/properties/height'
            }
          }
        ]
      },
      {
        'type': 'HorizontalLayout',
        'elements': [
          {
            'type': 'Control',
            'label': 'Nationality',
            'scope': {
              '$ref': '#/properties/nationality'
            }
          },
          {
            'type': 'Control',
            'label': 'Occupation',
            'scope': {
              '$ref': '#/properties/occupation'
            },
            'suggestion': ['Accountant', 'Engineer', 'Freelancer',
              'Journalism', 'Physician', 'Student', 'Teacher', 'Other']
          },
          {
            'type': 'Control',
            'label': 'Birthday',
            'scope': {
              '$ref': '#/properties/birthDate'
            }
          }
        ]
      }
    ]
  };
  private data = {
    name: 'John Doe',
    birthDate: '1985-06-02'
  };
}
