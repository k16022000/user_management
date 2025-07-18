import React, { useEffect } from 'react';
import { Modal, Button, Space } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useDispatch } from 'react-redux';
import { createUserRequest, updateUserRequest } from '../components/store/userListActions';

interface FormValues {
  data: any;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  id: string;
}

interface UserUpsertModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  tableData: any[];
  totalCount: number;
  tableMetadata: any;
}

const UserUpsertModal: React.FC<UserUpsertModalProps> = ({ isModalOpen, onClose }) => {
  const dispatch = useDispatch();

  const { email, first_name, last_name, avatar, id } =
    typeof isModalOpen === 'object' && isModalOpen !== null
      ? isModalOpen
      : { email: '', first_name: '', last_name: '', avatar: '', id: undefined };
  const isEdit = id;

  const onSubmit = (values: FormValues) => {
    if (isEdit) {
      dispatch(updateUserRequest({ id: isEdit, data: values }));
    } else {
      dispatch(createUserRequest(values));
    }
    onClose?.();
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: 'userList/getSingleUser', payload: id });
    }
  }, [id]);

  return (
    <Modal
      title={isEdit ? 'Edit User' : 'Create User'}
      open={isModalOpen}
      footer={null}
      onCancel={onClose}
    >
      <ProForm<FormValues>
        onFinish={async values => {
          const avatar = values.avatar;
          onSubmit({ ...values, avatar });
          onClose?.();
        }}
        initialValues={{ email, first_name, last_name, avatar, id }}
        layout="vertical"
        submitter={{
          render: props => {
            return (
              <Space style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={() => props.form?.submit?.()}>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Space>
            );
          },
        }}
      >
        <ProFormText
          name="first_name"
          label="First Name"
          placeholder="Enter first name"
          rules={[{ required: true, message: 'First name is required' }]}
        />
        <ProFormText
          name="last_name"
          label="Last Name"
          placeholder="Enter last name"
          rules={[{ required: true, message: 'Last name is required' }]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder="Enter email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        />
        <ProFormText
          name="avatar"
          label="Avatar URL"
          placeholder="Enter avatar image URL"
          rules={[
            { required: true, message: 'Avatar URL is required' },
            {
              pattern: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i,
              message: 'Please enter a valid image URL (e.g., https://example.com/image.jpg)',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UserUpsertModal;
