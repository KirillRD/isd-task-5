import { useState, useEffect, useRef } from 'react';
import { FakeUserToolBar } from './FakeUserToolBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { VirtualScrollerLazyEvent } from 'primereact/virtualscroller';
import { PAGE_SIZE, FIRST_PAGE_SIZE, Region, RegionName } from '../constants';
import { User } from '../types';
import { generateUsers, getUserGenerator } from './../service/generator.service';
import { UserGenerator } from '../service/generators/UserGenerator';

export type SelectRegion = {
  name: RegionName;
  code: Region;
}

const regions: SelectRegion[] = [
  { name: RegionName.BY, code: Region.BY },
  { name: RegionName.EN, code: Region.EN },
  { name: RegionName.UA, code: Region.UA }
];

const DEFAULT_REGION = regions[0];

export const FakeUserDataTable = () => {
  const [region, setRegion] = useState<SelectRegion>(DEFAULT_REGION);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [seed, setSeed] = useState<number>(0);

  const dataTable = useRef<DataTable<User[]>>(null);
  const userGenerator = useRef<UserGenerator | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [scroll, setScroll] = useState<number>(FIRST_PAGE_SIZE);

  const loadUserGenerator = async (): Promise<void> => {
    userGenerator.current = getUserGenerator(region.code);
    await userGenerator.current.loadData();
  }

  const resetTable = () => {
    setPage(1);
    setScroll(FIRST_PAGE_SIZE);
    dataTable.current?.resetScroll();
  }

  useEffect(() => {
    const load = async () => {
      await loadUserGenerator();
      const newUsers = generateUsers(userGenerator.current!, page, FIRST_PAGE_SIZE, errorCount, seed);
      setUsers(newUsers);
      resetTable();
    }

    load();
  }, [region, errorCount, seed]);

  const loadPage = () => {
    const newUsers = generateUsers(userGenerator.current!, page, PAGE_SIZE, errorCount, seed);
    setUsers([...users, ...newUsers]);
    setPage(page + 1);
  }

  const fetchUsers = (event: VirtualScrollerLazyEvent) => {
    if (scroll <= event.last) {
      setScroll(+event.last + PAGE_SIZE);
      loadPage();
    }
  }

  const handleRegionChange = (region: SelectRegion) => {
    setRegion(region);
  }

  const handleErrorCountChange = (errorCount: number) => {
    setErrorCount(errorCount);
  }

  const handleSeedChange = (seed: number) => {
    setSeed(seed);
  }

  const handleExportCSV = (selectionOnly: boolean) => {
    dataTable.current?.exportCSV({ selectionOnly });
  };

  return (
    <div className='flex flex-column align-items-center'>
      <div className='col-10 mt-4 p-4 border-1 border-primary-100 border-round-md surface-0 shadow-2'>
        <FakeUserToolBar
          className='mb-4 p-3 border-1 border-primary-50 border-round-md surface-50 shadow-1'
          regions={regions}
          region={region}
          onRegionChange={handleRegionChange}
          errorCount={errorCount}
          onErrorCountChange={handleErrorCountChange}
          seed={seed}
          onSeedChange={handleSeedChange}
          onExportCSV={handleExportCSV} />

        <DataTable
          ref={dataTable}
          value={users}
          scrollable
          scrollHeight='750px'
          virtualScrollerOptions={{
            lazy: true,
            onLazyLoad: fetchUsers,
            itemSize: 60,
            step: 10
          }}
        >
          <Column header='№' body={(data, options) => options.rowIndex + 1} />
          <Column field='id' header='Id' />
          <Column field='name' header='Name' />
          <Column field='address' header='Address' />
          <Column field='phone' header='Phone' />
        </DataTable>
      </div>
    </div>
  );
}
