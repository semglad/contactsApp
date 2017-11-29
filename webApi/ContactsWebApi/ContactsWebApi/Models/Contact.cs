namespace ContactsWebApi.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }

        public Contact()
        {
            FirstName = "Testi";
            LastName = "Testailu";
            Phone = "+358 40 454 5454";
            StreetAddress = "Katu 1";
            City = "Kaupunki";
        }

        public Contact(int id, string firstName, string lastName, string phone, string streetAddress, string city)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            StreetAddress = streetAddress;
            City = city;
        }
    }
}
