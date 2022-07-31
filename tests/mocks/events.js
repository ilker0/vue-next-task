const mockEventData = {
  data: {
    _embedded: {
      events: new Array(100).fill({}).map((_, index) => ({
        id: index,
        name: 'name' + index,
        priceRanges: [
          {
            type: 'standard',
            currency: 'USD',
            min: index,
            max: index + 10
          }
        ],
        dates: {
          start: {
            dateTime: '2022-09-13T00:15:00Z'
          }
        },
        ticketLimit: {
          info: 'There is an overall 8 ticket limit for this event.'
        }
      }))
    }
  }
}

export { mockEventData }
