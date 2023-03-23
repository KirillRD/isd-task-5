import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { SelectRegion } from './FakeUserDataTable';
import { MAX_ERROR_COUNT, MAX_SEED, MIN_ERROR_COUNT, MIN_SEED } from '../constants';
import { genSeed } from './../service/random.service';

type FakeUserToolBarProps = {
  className?: string;
  regions: SelectRegion[];
  region: SelectRegion;
  onRegionChange: (region: SelectRegion) => void;
  errorCount: number;
  onErrorCountChange: (errorCount: number) => void;
  seed: number;
  onSeedChange: (seed: number) => void;
  onExportCSV: (selectionOnly: boolean) => void;
}

const MIN_SLIDER_VALUE = 0;
const SLIDER_STEP = 0.25;
const MAX_SLIDER_VALUE = 10;

export const FakeUserToolBar = ({ className, regions, region, onRegionChange, errorCount, onErrorCountChange, seed, onSeedChange, onExportCSV }: FakeUserToolBarProps) => {

  const handleRegionChange = (e: DropdownChangeEvent) => {
    onRegionChange(e.value);
  }

  const handleErrorCountSliderChange = (e: SliderChangeEvent) => {
    onErrorCountChange(+e.value * 100);
  }

  const handleErrorCountInputChange = (e: InputNumberValueChangeEvent) => {
    onErrorCountChange(e.target.value!);
  }

  const handleSeedInputChange = (e: InputNumberValueChangeEvent) => {
    onSeedChange(e.target.value!);
  }

  const handleSeedRandomButtonClick = () => {
    onSeedChange(genSeed());
  }

  const handleExportCSVButtonClick = () => {
    onExportCSV(false);
  }

  return (
    <div className={className}>
      <div className='formgrid grid'>
        <div className='field col-2 m-0'>
          <label htmlFor='region'>Region</label>
          <Dropdown
            id='region'
            className='w-full'
            value={region}
            onChange={handleRegionChange}
            options={regions}
            optionLabel='name' 
            placeholder='Select region' />
        </div>

        <div className='field col-4 m-0'>
          <label htmlFor='error-count'>Count of errors</label>
          <div className='inline-flex w-full'>
            <InputNumber
              id='error-count'
              className='col pl-0'
              value={errorCount}
              onValueChange={handleErrorCountInputChange}
              min={MIN_ERROR_COUNT}
              max={MAX_ERROR_COUNT}
              maxFractionDigits={2} />
            <div className='col flex align-items-center'>
              <Slider
                className='col w-full'
                value={errorCount * MAX_SLIDER_VALUE / MAX_ERROR_COUNT}
                onChange={handleErrorCountSliderChange}
                min={MIN_SLIDER_VALUE}
                step={SLIDER_STEP}
                max={MAX_SLIDER_VALUE} />
            </div>
          </div>
        </div>

        <div className='field col-6 m-0'>
          <label htmlFor='seed'>Seed</label>
          <div className='inline-flex w-full'>
            <InputNumber
              id='seed'
              className='col pl-0'
              value={seed}
              onValueChange={handleSeedInputChange}
              min={MIN_SEED}
              max={MAX_SEED} />
            <Button className='col mr-2' label='Random' onClick={handleSeedRandomButtonClick} />
            <Button className='col' icon='pi pi-file' label='Export to CSV' onClick={handleExportCSVButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
