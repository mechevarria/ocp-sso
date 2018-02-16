import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const people = [
      [
        {
          id: 1,
          name: 'Fred Flintstone',
          address: '20 Dinosaur Way',
          city: 'Bedrock',
          state: 'Washington'
        },
        {
          id: 2,
          name: 'John Smith',
          address: '415 East Main Street',
          city: 'Norfolk',
          state: 'Virginia'
        },
        {
          id: 3,
          name: 'Frank Livingston',
          address: '234 Elm Street',
          city: 'Pittsburgh',
          state: 'Pennsylvania'
        },
        {
          id: 4,
          name: 'Linda McGovern',
          address: '22 Oak Street',
          city: 'Denver',
          state: 'Colorado'
        },
        {
          id: 5,
          name: 'Jim Brown',
          address: '72 Bourbon Way',
          city: 'Nashville',
          state: 'Tennessee'
        },
        {
          id: 6,
          name: 'Holly Nichols',
          address: '21 Jump Street',
          city: 'Hollywood',
          state: 'California'
        },
        {
          id: 7,
          name: 'Marie Edwards',
          address: '17 Cross Street',
          city: 'Boston',
          state: 'Massachusetts'
        },
        {
          id: 8,
          name: 'Pat Thomas',
          address: '50 Second Street',
          city: 'New York',
          state: 'New York'
        },
        {
          id: 9,
          name: 'Mike Thomas',
          address: '25 Second Street',
          city: 'Chicago',
          state: 'Illinois'
        },
        {
          id: 10,
          name: 'Holly Davidson',
          address: '22 Jump Street',
          city: 'Long Beach',
          state: 'California'
        },
        {
          id: 11,
          name: 'David Verona',
          address: '35 Ocean Drive',
          city: 'Miami',
          state: 'Florida'
        }
      ]
    ];
    return {people};
  }
}
