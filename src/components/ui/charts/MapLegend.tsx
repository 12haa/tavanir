import { Fragment } from 'react';
import Text from '../../shared/Text';
import { colors } from '../../../lib/theme';

const defaultItems = [
  { color: '#EF2B2B', border: '#C11515', label: 'از ۰ تا ۳۹ درصد' },
  { color: '#F7E733', border: '#C9BC1F', label: 'از ۴۰ تا ۶۹ درصد' },
  { color: '#86D24B', border: '#5FA32E', label: 'از ۷۰ تا ۸۹ درصد' },
  { color: '#43913E', border: '#2F6B2C', label: 'از ۹۰ تا ۱۰۰ درصد' },
];

function MapLegend({ items = defaultItems, className = '' }) {
  return (
    <div
      dir="rtl"
      className={`grid w-fit grid-cols-[auto_auto] items-center gap-x-3 gap-y-2 ${className}`}
    >
      {items.map((item) => (
        <Fragment key={item.label}>
          <Text className="text-md  " color={colors.primaryTextColor[100]}>
            {item.label}
          </Text>
          <span
            className="inline-block h-5 w-16 rounded-[px] border"
            style={{ backgroundColor: item.color, borderColor: item.border }}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default MapLegend;
