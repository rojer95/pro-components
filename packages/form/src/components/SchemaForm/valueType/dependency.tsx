import { noteOnce } from 'rc-util/lib/warning';
import ProFormDependency from '../../Dependency';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const dependency: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  /** ProFormDependency */
  if (item.valueType === 'dependency') {
    const fieldProps = item.getFieldProps?.();
    noteOnce(
      Array.isArray(fieldProps?.name),
      'SchemaForm: fieldProps.name should be NamePath[] when valueType is "dependency"',
    );
    noteOnce(
      typeof item.columns === 'function',
      'SchemaForm: columns should be a function when valueType is "dependency"',
    );

    if (!Array.isArray(fieldProps?.name)) return null;

    return (
      <ProFormDependency {...fieldProps} key={item.key}>
        {(values: any) => {
          if (!item.columns || typeof item.columns !== 'function') return null;
          return genItems(item.columns(values));
        }}
      </ProFormDependency>
    );
  }

  return true;
};
