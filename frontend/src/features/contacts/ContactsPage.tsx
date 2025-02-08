import { useEffect, useState } from "react";
import { BreadCrumbItem } from "@/components/SideNav/model";

import Layout from "./../Layout";
import ContactsDataGrid from "./ContactList";

import { Contact } from "./models";
import { getCustomeContacts } from "./api";
import { useConfiguration } from "@/providers/ConfigurationProvider";

const breadCrumbs: BreadCrumbItem[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Contacts",
    url: "/contacts",
  },
];

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const {configuration} = useConfiguration();

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getCustomeContacts(configuration.apiBaseUrl);
      setContacts(data);
    };

    fetchContacts();
  }, [configuration.apiBaseUrl]);

  return (
    <Layout titleToActivate="Contacts" breadcrumbs={breadCrumbs}>
      <Layout.Title>Contacts</Layout.Title>
      <ContactsDataGrid contacts={contacts} />
    </Layout>
  );
};

export default ContactsPage;
