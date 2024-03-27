import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { mongooseConnect } from "@/lib/mongoose";
import Buyer from "@/Models/buyer";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await Buyer.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await mongooseConnect();

        // check if user already exists
        const buyerExists = await Buyer.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!buyerExists) {
          await Buyer.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if buyer exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
