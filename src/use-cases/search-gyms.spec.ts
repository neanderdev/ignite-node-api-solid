import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'Title Gym 1',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    await gymsRepository.create({
      id: 'gym-2',
      title: 'Title Gym 2',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    await gymsRepository.create({
      id: 'gym-3',
      title: 'Gym 3',
      description: null,
      phone: null,
      latitude: -22.5688278,
      longitude: -48.6357383,
    })

    const { gyms } = await sut.execute({
      query: 'Title',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-1' }),
      expect.objectContaining({ id: 'gym-2' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.5688278,
        longitude: -48.6357383,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
