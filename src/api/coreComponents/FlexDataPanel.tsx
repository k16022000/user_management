/* eslint-disable no-duplicate-imports */
import React, { useEffect, useMemo, useState } from 'react';
import { Table, Card, Input, Pagination, Radio, Button } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, TableOutlined, MenuOutlined } from '@ant-design/icons';
import './styles/dataFlexView.scss';

interface DataFlexViewProps {
  tableData: any[];
  tableColumns?: TableProps<any>['columns'];
  renderCard?: (item: any) => React.ReactNode;
  handleDataRefresh?: (page: number) => void;
  searchable?: boolean;
  totalCount?: number;
  isLoading?: boolean;
  paginationCacheKey?: string;
  customCardStyle?: React.CSSProperties;
  customTableProps?: TableProps<any>;
  flowHeader?: string;
  allowedViews?: ('table' | 'card')[];
  actionButtonLabel?: string;
  onActionButtonClick?: () => void;
}

const FlexDataPanel: React.FC<DataFlexViewProps> = ({
  tableData = [],
  tableColumns,
  renderCard,
  handleDataRefresh,
  searchable = false,
  totalCount = 0,
  customCardStyle = {},
  isLoading = false,
  customTableProps = {},
  allowedViews = ['table', 'card'],
  flowHeader = '',
  actionButtonLabel = 'Action',
  onActionButtonClick,
}) => {
  const [search, setSearch] = useState('');
  const [pageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [view, setView] = useState<'table' | 'card'>(allowedViews[0]);

  const effectiveSearch = search.trim();
  const isSearching = effectiveSearch.length > 0;

  useEffect(() => {
    if (!isSearching && handleDataRefresh) {
      handleDataRefresh(current);
    }
  }, [current, pageSize, handleDataRefresh]);

  const filteredData = useMemo(() => {
    if (!isSearching) return tableData;
    return tableData.filter(item =>
      `${item.first_name || ''} ${item.last_name || ''}`
        .toLowerCase()
        .includes(effectiveSearch.toLowerCase())
    );
  }, [effectiveSearch, tableData]);

  const paginatedData = useMemo(() => {
    if (isSearching) {
      const start = (current - 1) * pageSize;
      return filteredData.slice(start, start + pageSize);
    }
    return filteredData;
  }, [filteredData, current, pageSize, isSearching]);

  const columns = useMemo(() => {
    if (tableColumns?.length) return tableColumns;
    if (!tableData.length) return [];
    return Object.keys(tableData[0])
      .filter(key => key !== 'id')
      .map(key => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key,
      }));
  }, [tableColumns, tableData]);

  return (
    <div className="dataFlewViewWrapper">
      <div className="dataFlexView">
        <div className="searchBar">
          <div>{flowHeader}</div>
          <div>
            {searchable && (
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search by name..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrent(1);
                }}
                style={{ width: 300, marginRight: 10 }}
              />
            )}
            {actionButtonLabel && onActionButtonClick && (
              <Button type="primary" onClick={onActionButtonClick}>
                {actionButtonLabel}
              </Button>
            )}
          </div>
        </div>

        <div className="viewController">
          {allowedViews.length > 1 && (
            <Radio.Group
              value={view}
              onChange={e => setView(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              {allowedViews.includes('table') && (
                <Radio.Button value="table">
                  <MenuOutlined /> Table
                </Radio.Button>
              )}
              {allowedViews.includes('card') && (
                <Radio.Button value="card">
                  <TableOutlined /> Card
                </Radio.Button>
              )}
            </Radio.Group>
          )}
        </div>

        {view === 'table' ? (
          <div className="tableContainer">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={paginatedData}
              pagination={false}
              loading={isLoading}
              {...customTableProps}
            />
          </div>
        ) : (
          <div className="cardContainer">
            {paginatedData.map(item =>
              renderCard ? (
                renderCard(item)
              ) : (
                <Card key={String(item.id ?? Math.random())} style={{ ...customCardStyle }}>
                  {Object.entries(item).map(([key, value]) =>
                    key !== 'id' ? (
                      <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </p>
                    ) : null
                  )}
                </Card>
              )
            )}
          </div>
        )}

        <div className="paginationWrapper">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={isSearching ? filteredData.length : totalCount}
            showSizeChanger={false}
            onChange={page => setCurrent(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default FlexDataPanel;
